import { Asset } from "@/features/assets/types";

export const addAssetsToURL = (assets: Asset[]) => {
  const assetIds = assets.map((asset) => asset._id).join(',');
  const url = new URL(window.location.href);
  url.searchParams.set('assets', assetIds);
  window.history.pushState({}, '', url.toString());
};

export const getAssetsIdsFromURL = () => {
  const url = new URL(window.location.href);
  const assetIds = url.searchParams.get('assets')?.split(',');
  return assetIds;
};

export const createBackLink = (assets: Asset[]) => {
  const selectedIds = assets.map((asset) => asset._id);
  const url = new URL(window.location.href);
  url.searchParams.set('assets', selectedIds.join(','));
  return url.toString();
}

export const clearAssetsFromURL = () => {
  const url = new URL(window.location.href);
  url.searchParams.delete('assets');
  window.history.pushState({}, '', url.toString());
}