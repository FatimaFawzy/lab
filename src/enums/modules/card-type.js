import { EnumTrait } from "@/enums/modules/EnumTrait";

export const CardType = Object.freeze({
     ...EnumTrait,
     NoCard: {
          value: 0,
          label: "بدون نوع",
          color: "secondary",
     },
     Old: {
          value: 1,
          label: "قديمة",
          color: "danger",
     },
     New: {
          value: 2,
          label: "جديدة",
          color: "success",
     },
});
