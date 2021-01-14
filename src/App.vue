<template>
  <div id="app">
    <h1>ToDoリスト</h1>
    <input type="radio" name="type" value="すべて" v-model="selectType" />すべて
    <input type="radio" name="type" value="作業中" v-model="selectType" />作業中
    <input type="radio" name="type" value="完了" v-model="selectType" />完了

    <Table id="table">
      <tr>
        <td>ID</td>
        <td>コメント</td>
        <td>状態</td>
        <td></td>
      </tr>
      <tr v-for="(todo, key) in displayTodo" :key="key">
        <td>{{ todo.id }}</td>
        <td>{{ todo.comment }}</td>
        <td>
          <button @click="switchStatus(todo.id)">{{ todo.status }}</button>
        </td>
        <td>
          <button @click="deleteAry(todo.id)">削除</button>
        </td>
      </tr>
    </Table>
    <h2>新規タスクの追加</h2>
    <input type="text" id="input" v-model="inputContent" />
    <input type="button" id="add" value="追加" @click="addTask" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      //現在選択されている状態(初期値：すべて)
      selectType: 'すべて',
      //アウトプット配列作成
      todoList: [],
      //テキストボックスオブジェクト保存用変数
      inputContent: '',
    };
  },
  computed: {
    //表示するタスクの制限
    displayTodo() {
      return this.todoList.filter((e) => {
        //状態切り替えボタンが「すべて」であれば無条件、それ以外で有れば配列から絞り込み
        return 'すべて' === this.selectType || e.status === this.selectType;
      });
    },
  },
  methods: {
    //タスク追加
    addTask() {
      //インプット
      this.todoList.push({
        id: this.todoList.length,
        comment: this.inputContent,
        status: '作業中',
      });
    },
    //配列削除
    deleteAry(cntAry) {
      //配列削除
      this.todoList.splice(cntAry, 1);
      //IDの入れ替え
      this.todoList.forEach((todo, cnt) => {
        todo.id = cnt;
      });
    },
    //状態切り替え
    switchStatus(cntAry) {
      if (this.todoList[cntAry]['status'] === '作業中') {
        this.todoList[cntAry]['status'] = '完了';
      } else {
        this.todoList[cntAry]['status'] = '作業中';
      }
    },
  },
};
</script>

<style>
td {
  text-align: center;
}
</style>
