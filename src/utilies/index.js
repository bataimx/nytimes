export function getThumb(multimedia, crop_name){
  let item = multimedia.filter(item => item.crop_name === crop_name);
  return item.length ? item[0].url : '';
}
export function lastPage(items_length,items_page){
  return Math.ceil(items_length / items_page);
}
export function openModal(){
  if (typeof window.$ !== 'function') {
    return false;
  }
  window.$('#modal').modal();
}