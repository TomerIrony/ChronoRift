import { createAction } from "@reduxjs/toolkit";


export const isMobileAction = createAction<{isMobile: boolean}>('ui/isMobile')