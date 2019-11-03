export const updateObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    }
};

export const updateObjectInArray = (array, uid, changes) => {
  return array.map((item) => {
    if (item.uid !== uid) {
      return item
   }

   return {
     ...item,
     ...changes
   }
  })
}
