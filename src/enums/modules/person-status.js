import { EnumTrait } from "@/enums/modules/EnumTrait";

export const PersonStatus = Object.freeze({
     ...EnumTrait,
     Init: {
          value: 0,
          label: "لم يتم التحديث",
          color: "info",
     },
     Done: {
          value: 1,
          label: "تمت الموافقة",
          color: "success",
     },
     Pending: {
          value: 2,
          label: "بانتظار الموافقة",
          color: "warning",
     },
     Rejected: {
          value: 4,
          label: "تم الرفض",
          color: "danger",
     },
});
