// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "400px",
// };

// const center = {
//   lat: 23.052746941948136, // Replace with your college latitude
//   lng: 72.6033931369555, // Replace with your college longitude
// };

// function CollegeMap() {
//   return (
//     <LoadScript googleMapsApiKey="YOUR_API_KEY">
//       <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
//         <Marker position={center} />
//       </GoogleMap>
//     </LoadScript>
//   );
// }

// export default CollegeMap;

export default function CollegeMap() {
  return (
    <div className="w-full h-96">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.1990622559065!2d72.60128807461537!3d23.053162515187203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e841bd0f0a865%3A0x1bd11a73e04450b3!2sGujarat%20Institute%20Of%20Nursing%20Education%20And%20Research%20Ahmedabad!5e0!3m2!1sen!2sin!4v1759143264394!5m2!1sen!2sin"
        width="600"
        height="450"
        className="w-full h-full border-0 rounded-lg"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Gujarat Institute Of Nursing Education And Research Ahmedabad Location"
      ></iframe>
    </div>
  );
}
