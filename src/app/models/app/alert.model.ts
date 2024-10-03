import { AlertTypeEnum } from "@models/enum/alert.enum";

export interface Alert {
    show: boolean;
    title: string;
    message: string;
    type: AlertTypeEnum;
    closeButton: boolean;
    isStaticAlert?: boolean;
  }