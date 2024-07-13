import { EnumTrait } from "@/enums/modules/EnumTrait";

export const PortionStatus = Object.freeze({
     ...EnumTrait,
     InActive: {
          value: 0,
          label: "غير فعالة",
          color: "danger",
     },
     ReadyToReceive: {
          value: 1,
          label: "فعالة",
          color: "success",
     },
     Received: {
          value: 2,
          label: "مستلمة",
          color: "info",
     },
     CanNotReceive: {
          value: 3,
          label: "غير قابلة للإستلام",
          color: "warning",
     },
});

export const PortionStatusOptions = Object.freeze({
     ...EnumTrait,
     InActive: {
          value: 0,
          label: "غير فعالة",
          color: "danger",
     },
     ReadyToReceive: {
          value: 1,
          label: "فعالة",
          color: "success",
     },
});
