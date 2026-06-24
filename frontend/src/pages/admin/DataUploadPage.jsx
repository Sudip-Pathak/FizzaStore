import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { useBulkAddProductsMutation } from "../../slices/productSlice";
import { Upload, ArrowLeft, FileSpreadsheet, FileJson, CheckCircle, AlertCircle } from "lucide-react";

const DataUploadPage = () => {
  const [fileData, setFileData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [bulkAddProducts, { isLoading }] = useBulkAddProductsMutation();
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const fileExtension = file.name.split(".").pop().toLowerCase();

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        if (fileExtension === "json") {
          // Parse JSON
          const data = JSON.parse(event.target.result);
          if (Array.isArray(data)) {
            setFileData(data);
          } else {
            toast.error("JSON file must contain an array of products.");
          }
        } else if (fileExtension === "xlsx" || fileExtension === "xls") {
          // Parse Excel
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          setFileData(json);
        } else {
          toast.error("Unsupported file format. Please upload .xlsx or .json");
        }
      } catch (err) {
        toast.error("Error parsing file. Please check the format.");
        console.error(err);
      }
    };

    if (fileExtension === "json") {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  const handleUploadToDb = async () => {
    if (fileData.length === 0) {
      toast.error("No data to upload");
      return;
    }

    // Basic validation to ensure required fields exist
    const isValid = fileData.every(
      (item) => item.name && item.price !== undefined && item.brand && item.category
    );

    if (!isValid) {
      toast.error("Some rows are missing required fields (name, price, brand, category).");
      return;
    }

    try {
      const resp = await bulkAddProducts({ products: fileData }).unwrap();
      toast.success(resp.message);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.data?.error || "Failed to upload data");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-8">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Header */}
        <div className="bg-white border border-base-200 rounded-sm shadow-sm p-5 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Upload size={22} className="text-primary" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Upload Products Data</h1>
              <p className="text-gray-500 text-xs">Import products in bulk via Excel or JSON file</p>
            </div>
          </div>
          <button
            className="btn btn-sm btn-ghost rounded-sm border border-base-300 flex items-center gap-2"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={16} /> Dashboard
          </button>
        </div>

        {/* Upload Card */}
        <div className="bg-white border border-base-200 rounded-sm shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="flex items-center gap-3 p-4 border border-base-200 rounded-sm bg-base-100">
              <FileSpreadsheet size={28} className="text-emerald-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-gray-700">Excel Format (.xlsx)</p>
                <p className="text-xs text-gray-500">Upload spreadsheet with product columns</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 border border-base-200 rounded-sm bg-base-100">
              <FileJson size={28} className="text-purple-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-gray-700">JSON Format (.json)</p>
                <p className="text-xs text-gray-500">Upload array of product objects</p>
              </div>
            </div>
          </div>

          <div className="form-control">
            <label className="label pb-1">
              <span className="label-text font-semibold text-gray-700">Select File</span>
            </label>
            <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-base-300 rounded-sm p-8 cursor-pointer hover:border-primary hover:bg-base-100 transition-colors">
              <Upload size={32} className="text-gray-400" />
              <div className="text-center">
                <p className="font-semibold text-gray-600">Click to upload .xlsx or .json</p>
                <p className="text-xs text-gray-400 mt-1">Required columns: name, brand, category, description, price, countInStock</p>
              </div>
              {fileName && (
                <div className="flex items-center gap-2 bg-success/10 text-success px-3 py-1 rounded-sm text-sm">
                  <CheckCircle size={16} /> {fileName}
                </div>
              )}
              <input
                type="file"
                className="hidden"
                accept=".xlsx,.xls,.json"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>

        {/* Preview + Upload */}
        {fileData.length > 0 && (
          <div className="bg-white border border-base-200 rounded-sm shadow-sm overflow-hidden">
            <div className="p-5 border-b border-base-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-success" />
                <h3 className="font-bold text-gray-800">
                  Preview: {fileName} — {fileData.length} products ready
                </h3>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="table table-sm w-full">
                <thead>
                  <tr className="bg-base-100 text-gray-600 text-xs uppercase tracking-wider border-b border-base-200">
                    <th className="font-semibold py-3">Name</th>
                    <th className="font-semibold">Brand</th>
                    <th className="font-semibold">Category</th>
                    <th className="font-semibold">Price</th>
                    <th className="font-semibold">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {fileData.slice(0, 5).map((item, index) => (
                    <tr key={index} className="border-t border-base-200">
                      <td className="text-sm text-gray-700">{item.name}</td>
                      <td className="text-sm text-gray-600">{item.brand}</td>
                      <td><span className="badge badge-ghost rounded-sm text-xs">{item.category}</span></td>
                      <td className="font-semibold text-primary text-sm">${item.price}</td>
                      <td className="text-sm">{item.countInStock || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {fileData.length > 5 && (
              <div className="px-5 py-3 text-sm text-gray-500 bg-base-100 border-t border-base-200 text-center">
                ... and <span className="font-bold">{fileData.length - 5}</span> more products
              </div>
            )}

            <div className="p-5 border-t border-base-200">
              <button
                className="btn btn-primary w-full rounded-sm text-white flex items-center justify-center gap-2"
                onClick={handleUploadToDb}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <><Upload size={16} /> Upload {fileData.length} Products to Database</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataUploadPage;
