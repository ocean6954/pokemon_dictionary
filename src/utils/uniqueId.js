export default function uniqueImageContainerId() {
  const randomID = Math.random().toString(36).slice(2);
  return randomID;
}

export const uniqueSideBarId = () => {
  const randomID = Math.random().toString(36).slice(2);
  return randomID;
};
