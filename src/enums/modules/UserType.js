import { EnumTrait } from "@/enums/modules/EnumTrait";

export const UserType = Object.freeze({
     ...EnumTrait,

     Admin: {
          value: 1,
          label: "ادمن",
     },
     InquiryEmployee: {
          value: 2,
          label: "موظف استعلام",
     },
     StationEmployee: {
          value: 3,
          label: "موظف محطة ",
     },
});
