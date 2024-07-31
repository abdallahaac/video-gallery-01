export const state = () => ({
  tags: [],
  sort: ""
})

export const mutations = {
  addTag(state, value) {
    state.tags.push(value);
  },
  removeTag(state, value) {
    for(var i = 0; i < state.tags.length; i++){
      if(state.tags[i] === value){
        state.tags.splice(i, 1);
        i--;
      }
    }
  },
  changeTags(state, value){
    state.tags = value;
  },
  
  changeSort(state, value){
    state.sort = value;
  }
}
