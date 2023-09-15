import AdSlotLeft from './AdSlotLeft';
import AdSlotRight from './AdSlotRight';

export default function SinglePostAds({children, adLeftID, adRightID}) {

  return (
    <>
    <AdSlotLeft adLeftID={adLeftID} />
    {children}
    <AdSlotRight adRightID={adRightID} />
    </>
  )
}
