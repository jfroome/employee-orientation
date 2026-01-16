import PropTypes from "prop-types";

const SynthesiaIoEmbed = ({ embedId }) => (
  <div 
   className="video-responsive"
  >
    <iframe 
      src={`https://share.synthesia.io/embeds/videos/${embedId}`}
      loading="lazy"
      title="Synthesia video player - Orientation" 
      // allow="" 
      // style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0; margin: 0; overflow:hidden;"

      style={{border: "none", scrollBars: "none"}}
      allow="encrypted-media; fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
       
      />
  </div>
);

// SynthesiaIoEmbed.propTypes = {
//   embedId: PropTypes.string.isRequired
// };

export default SynthesiaIoEmbed;
