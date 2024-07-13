import { EnumTrait } from "@/enums/modules/EnumTrait";

export const UserRole = Object.freeze({
     ...EnumTrait,
     User: {
          value: 0,
          label: "User",
     },
     Admin: {
          value: 1,
          label: "Admin",
     },
     InquiryEmployee: {
          value: 2,
          label: "InquiryEmployee",
     },
     StationEmployee: {
          value: 3,
          label: "StationEmployee",
     },
});
