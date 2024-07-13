import { EnumTrait } from "@/enums/modules/EnumTrait";

export const StationType = Object.freeze({
     ...EnumTrait,
     Government: {
          value: 0,
          label: " حكومي",
     },
     Private: {
          value: 1,
          label: " خاص",
     },
});
