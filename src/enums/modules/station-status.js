import { EnumTrait } from "@/enums/modules/EnumTrait";

export const stationStatus = Object.freeze({
     ...EnumTrait,
     InActive: {
          value: 0,
          label: "غير فعالة",
          color: "danger",
     },
     Active: {
          value: 1,
          label: " فعالة",
          color: "success",
     },
});
