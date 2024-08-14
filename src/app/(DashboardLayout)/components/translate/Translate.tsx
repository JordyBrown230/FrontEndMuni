import React, { useEffect } from 'react';

const Translate: React.FC = () => {
    useEffect(() => {
        // Inject the settings script
        const scriptSettings = document.createElement('script');
        scriptSettings.innerHTML = `
            window.gtranslateSettings = {
                "default_language": "es",
                "languages": ["es","en", "fr", "de", "it"],
                "wrapper_selector": ".gtranslate_wrapper",
                "switcher_horizontal_position": "right",
                "float_switcher_open_direction": "bottom"
            };
        `;
        document.body.appendChild(scriptSettings);

        // Inject the gtranslate script
        const scriptGtranslate = document.createElement('script');
        scriptGtranslate.src = "https://cdn.gtranslate.net/widgets/latest/float.js";
        scriptGtranslate.defer = true;
        document.body.appendChild(scriptGtranslate);

        // Cleanup function to remove the scripts when the component unmounts
        return () => {
            document.body.removeChild(scriptSettings);
            document.body.removeChild(scriptGtranslate);
        };
    }, []);

    return (
        <div className="gtranslate_wrapper"></div>
    );
};

export default Translate;
