import { Helmet } from "react-helmet-async";

function Meta({
  title = "Welcome to Fizza",
  description = "This is a Fizza Shop.",
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}
export default Meta;
