import { useState } from "react";
import { RqbitWebUI } from "./rqbit-webui-src/rqbit-web";
import { CurrentDesktopState, RqbitDesktopConfig } from "./configuration";
import { ConfigModal } from "./configure";
import { IconButton } from "./rqbit-webui-src/components/IconButton";
import { BsBodyText, BsSliders2 } from "react-icons/bs";
import { LogStreamModal } from "./rqbit-webui-src/components/LogStreamModal";
import { APIContext } from "./rqbit-webui-src/context";
import { makeAPI } from "./api";

export const RqbitDesktop: React.FC<{
  version: string;
  defaultConfig: RqbitDesktopConfig;
  currentState: CurrentDesktopState;
}> = ({ version, defaultConfig, currentState }) => {
  let [configured, setConfigured] = useState<boolean>(currentState.configured);
  let [config, setConfig] = useState<RqbitDesktopConfig>(
    currentState.config ?? defaultConfig
  );
  let [configurationOpened, setConfigurationOpened] = useState<boolean>(false);

  const configButton = (
    <IconButton
      className="p-3 text-primary"
      onClick={() => {
        setConfigurationOpened(true);
      }}
    >
      <BsSliders2 />
    </IconButton>
  );

  return (
    <APIContext.Provider value={makeAPI(config)}>
      {configured && (
        <RqbitWebUI
          title={`Rqbit Desktop v${version}`}
          menuButtons={[configButton]}
        ></RqbitWebUI>
      )}
      <ConfigModal
        show={!configured || configurationOpened}
        handleStartReconfigure={() => {
          setConfigured(false);
        }}
        handleCancel={() => {
          setConfigurationOpened(false);
        }}
        handleConfigured={(config) => {
          setConfig(config);
          setConfigurationOpened(false);
          setConfigured(true);
        }}
        initialConfig={config}
        defaultConfig={defaultConfig}
      />
    </APIContext.Provider>
  );
};
