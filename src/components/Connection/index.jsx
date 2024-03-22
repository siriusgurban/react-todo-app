import { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import StyledBadge from "../StyledBadge/index";
import StyledBadgeRed from "../StyledBadgeRed/index";

function Connection() {
  const [networkState, setNetworkState] = useState({
    isOnline: navigator.onLine,
    effectiveType: "",
    downlink: 0,
    rtt: 0,
  });

  useEffect(() => {
    const updateNetState = () => {
      const connection = navigator.connection;
      if (connection) {
        setNetworkState({
          isOnline: navigator.onLine,
        });
      }
    };
    window.addEventListener("load", updateNetState);
    window.addEventListener("online", updateNetState);
    window.addEventListener("offline", updateNetState);
  }, [networkState]);
  return (
    <div>
      {networkState.isOnline ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10 + "px",
          }}
        >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "center", horizontal: "center" }}
            variant="dot"
          ></StyledBadge>
          <p> Online</p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10 + "px",
          }}
        >
          {/* <CircleIcon color="secondary" sx={{ width: 14 + "px" }} /> */}
          <StyledBadgeRed
            overlap="circular"
            anchorOrigin={{ vertical: "center", horizontal: "center" }}
            variant="dot"
          ></StyledBadgeRed>
          <p> Offline</p>
        </div>
      )}
    </div>
  );
}

export default Connection;
