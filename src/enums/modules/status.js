import { EnumTrait } from "@/enums/modules/EnumTrait";

export const Status = Object.freeze({
     ...EnumTrait,
     Init: {
          value: 0,
          label: "لم يتم التحديث",
          color: "warning",
     },
     Done: {
          value: 1,
          label: "تمت  الموافقة",
          color: "success",
     },
     Pending: {
          value: 2,
          label: "بانتظار  الموافقة",
          color: "warning",
     },
     Expired: {
          value: 3,
          label: " تم  الرفض ",
          color: "danger",
     },
});
