import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Meta from "../components/Meta";
import { MapPin, User, Phone, Home, Building } from "lucide-react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";

function LocationMarker({ location, setLocation, setAddress, setCity }) {
  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      if (data && data.address) {
        const newCity = data.address.city || data.address.town || data.address.village || data.address.county || data.address.state || "";
        const newAddress = data.address.road || data.address.suburb || data.display_name || "";
        setCity(newCity);
        setAddress(newAddress);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  useMapEvents({
    click(e) {
      setLocation({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
      fetchAddress(e.latlng.lat, e.latlng.lng);
    },
  });

  return location.lat !== 0 ? (
    <Marker position={[location.lat, location.lng]}></Marker>
  ) : null;
}

const ShippingPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { shippingAddress } = useSelector((state) => state.cart);
  
  const [recipient, setRecipient] = useState(shippingAddress.recipient || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [phone, setPhone] = useState(shippingAddress.phone || "");
  const [location, setLocation] = useState(
    shippingAddress.location || { lat: 27.7172, lng: 85.3240 } // Default to Kathmandu
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fix default leaflet icon issue in React
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: iconRetina,
      iconUrl: icon,
      shadowUrl: iconShadow,
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ recipient, address, city, phone, location }));
    navigate("/placeorder"); // Based on original flow, skips payment page for now or we can add it later if the backend supports it. The original code skipped directly to placeorder.
  };

  return (
    <div className="bg-base-100 min-h-screen pb-24">
      <Meta title="Shipping Information" />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <CheckoutSteps step1 step2 />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-base-200 shadow-sm rounded-sm overflow-hidden mt-8 max-w-2xl mx-auto"
        >
          <div className="bg-base-100 p-6 md:p-8 border-b border-base-200 flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-sm flex items-center justify-center">
              <MapPin size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Shipping Address</h2>
              <p className="text-sm opacity-60">Where should we deliver your order?</p>
            </div>
          </div>

          <form onSubmit={submitHandler} className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2"><User size={16}/> Recipient Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter recipient name"
                  className="input input-bordered focus:input-primary transition-colors"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2"><Phone size={16}/> Contact Number</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  className="input input-bordered focus:input-primary transition-colors"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2"><Home size={16}/> Street Address</span>
              </label>
              <input
                type="text"
                placeholder="House no. / Building / Street / Area"
                className="input input-bordered focus:input-primary transition-colors"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2"><Building size={16}/> City / Province</span>
              </label>
              <input
                type="text"
                placeholder="Province / City / District"
                className="input input-bordered focus:input-primary transition-colors"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2"><MapPin size={16}/> Exact Location on Map</span>
              </label>
              <p className="text-sm text-gray-500 mb-2">Click on the map to pin your exact delivery location.</p>
              <div className="h-64 w-full rounded-md overflow-hidden border border-base-200 relative z-0">
                <MapContainer center={[location.lat, location.lng]} zoom={13} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationMarker location={location} setLocation={setLocation} setAddress={setAddress} setCity={setCity} />
                </MapContainer>
              </div>
            </div>

            <div className="pt-6 border-t border-base-200 flex justify-end">
              <button type="submit" className="btn btn-primary px-8 rounded-sm text-white">
                Continue to Next Step
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ShippingPage;
