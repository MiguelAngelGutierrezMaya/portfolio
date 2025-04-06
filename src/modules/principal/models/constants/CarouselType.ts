//
// Interface that contains the carousel types.
// ===============================================
// - FRONT: Frontend carousel type.
// - BACK: Backend carousel type.
// - MOBILE: Mobile carousel type.
//
export enum CarouselType {
  FRONT = 'frontend',
  BACK = 'backend',
  MOBILE = 'mobile',
}

//
// Type that contains the carousel types.
// ===============================================
// - FRONT: Frontend carousel type.
// - BACK: Backend carousel type.
// - MOBILE: Mobile carousel type.
//
export type CarouselTypeData = CarouselType.FRONT | CarouselType.BACK | CarouselType.MOBILE;
