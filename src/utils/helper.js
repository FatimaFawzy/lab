import $alert from "sweetalert2";

export const showAlertWithConfirm = (
     title,
     text = "لا يمكن التراجع عن هذه الخطوة",
     confirmButtonText = "نعم",
     cancelButtonText = "الغاء"
) => {
     return $alert.fire({
          title,
          text,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#4CAF50",
          cancelButtonColor: "#9da6af",
          confirmButtonText,
          cancelButtonText,
     });
};

export const showAlertWithSuccess = (title, text) => {
     return $alert.fire({
          title,
          text,
          icon: "success",
          confirmButtonColor: "#96D701",
     });
};

export const decodeToken = (token) => {
     try {
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
               atob(base64)
                    .split("")
                    .map(function (c) {
                         return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join("")
          );

          return JSON.parse(jsonPayload);
     } catch (e) {
          throw new Error("Token is not valid!");
     }
};

export const downloadFile = (data, fileName) => {
     const link = document.createElement("a");
     link.href = data;
     link.setAttribute("download", fileName);
     document.body.appendChild(link);
     link.click();
};

export const isTimestampExpired = (unixTimestamp) => {
     const currentUnixTimestamp = Math.floor(Date.now() / 1000); // Get current Unix timestamp in seconds
     return unixTimestamp < currentUnixTimestamp;
};

export const checkObjectParams = (obj) => {
     return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value != null && value !== ""));
};
