<template>
  <div id="app">
    <h1>ToDoリスト</h1>
    <input
      type="radio"
      name="type"
      value="all"
      v-model="selectType"
      @change="changeDisplay"
    />すべて
    <input
      type="radio"
      name="type"
      value="working"
      v-model="selectType"
      @change="changeDisplay"
    />作業中
    <input
      type="radio"
      name="type"
      value="comp"
      v-model="selectType"
      @change="changeDisplay"
    />完了

    <Table id="table">
      <tr>
        <td>ID</td>
        <td>コメント</td>
        <td>状態</td>
        <td></td>
      </tr>
    </Table>
    <h2>新規タスクの追加</h2>
    <input type="text" id="input" />
    <input type="button" id="add" value="追加" @click="addTask" />
  </div>
</template>

<script>
import Task from './js/Task';

export default {
  data() {
    return {
      //現在選択されている状態(初期値：all)
      selectType: 'all',
      //アウトプット配列作成
      todoList: [],
      //テーブルオブジェクト保存用変数
      eleTable: {},
      //テキストボックスオブジェクト保存用変数
      inputContent: '',
      //タスククラスオブジェクト保存用変数
      task: {},
    };
  },
  mounted() {
    //テーブルをオブジェクト化
    this.eleTable = document.getElementById('table');
  },
  methods: {
    //タスク追加
    addTask() {
      //テキストボックスをオブジェクト化
      this.inputContent = document.getElementById('input').value;

      //インプット
      this.todoList.push({
        comment: this.inputContent,
        status: '作業中',
        delete: '削除',
      });

      //タスククラスをオブジェクト化
      this.task = new Task(this.eleTable, this.selectType, this.todoList);

      //表示更新
      this.task.changeDisplay();
    },
    //表示更新
    changeDisplay() {
      //タスククラスをオブジェクト化
      this.task = new Task(this.eleTable, this.selectType, this.todoList);

      this.task.changeDisplay();
    },
  },
};
</script>

<style>
td {
  text-align: center;
}
</style>
