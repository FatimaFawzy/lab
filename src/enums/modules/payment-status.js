import { EnumTrait } from "@/enums/modules/EnumTrait";

export const PaymentStatus = Object.freeze({
     ...EnumTrait,
     Paid: {
          value: 1,
          label: "مدفوعة",
          color: "success",
     },
     UnPaid: {
          value: 2,
          label: "غير مدفوعة",
          color: "danger",
     },
});
