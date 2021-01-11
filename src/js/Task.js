//タスククラス
export default class Task {

    //コンストラクタ
    constructor(tableElement, selectType, todoList) {
        this.tableElement = tableElement;
        this.selectType = selectType;
        this.todoList = todoList;
    }

    //表示更新
    changeDisplay = () => {

        //ヘッダ以外のテーブル行削除(初期化)
        while (this.tableElement.rows[1]) this.tableElement.deleteRow(1);

        //配列数取得
        const aryNum = this.todoList.length;

        //状態切り替え
        switch (this.selectType) {
            case 'all':
                for (let cntAry = 0; cntAry < aryNum; cntAry++) {
                    //テーブルデータ追加
                    this.addTable(cntAry);
                }
                break;
            case 'working':
                for (let cntAry = 0; cntAry < aryNum; cntAry++) {

                    //「作業中」は表示
                    if (this.todoList[cntAry]['status'] === '作業中') {
                        //テーブルデータ追加
                        this.addTable(cntAry);
                    }
                }
                break;
            case 'comp':
                for (let cntAry = 0; cntAry < aryNum; cntAry++) {

                    //「完了」は表示
                    if (this.todoList[cntAry]['status'] === '完了') {
                        //テーブルデータ追加
                        this.addTable(cntAry);
                    }
                }
                break;
        }
    }

    //テーブルデータ追加
    addTable = (cntAry) => {

        //ID作成
        const eleOutputId = document.createElement('p');
        eleOutputId.setAttribute('id', 'id' + cntAry);
        eleOutputId.textContent = cntAry;
        eleOutputId.style.margin = '0';

        //コメント作成
        const eleOutputComment = document.createElement('p');
        eleOutputComment.textContent = this.todoList[cntAry]['comment'];
        eleOutputComment.style.margin = '0';

        //状態ボタン作成
        const eleOutputStatus = document.createElement('input');
        eleOutputStatus.setAttribute('id', 'status' + cntAry);
        eleOutputStatus.setAttribute('type', 'button');
        eleOutputStatus.setAttribute('value', this.todoList[cntAry]['status']);

        //削除ボタン作成
        const eleOutputDelete = document.createElement('input');
        eleOutputDelete.setAttribute('id', 'delete' + cntAry);
        eleOutputDelete.setAttribute('type', 'button');
        eleOutputDelete.setAttribute('value', this.todoList[cntAry]['delete']);

        //テーブルをオブジェクト化
        const eleTable = document.getElementById('table');

        //行追加
        const rowTable = eleTable.insertRow();

        //セル追加
        let cellTable = rowTable.insertCell();
        cellTable.appendChild(eleOutputId);

        cellTable = rowTable.insertCell();
        cellTable.appendChild(eleOutputComment);

        cellTable = rowTable.insertCell();
        cellTable.appendChild(eleOutputStatus);

        cellTable = rowTable.insertCell();
        cellTable.appendChild(eleOutputDelete);

        //状態ボタンに関数紐付け
        const eleSelectType = document.getElementById('status' + cntAry);
        eleSelectType.addEventListener('click', () => {
            this.switchStatus(cntAry)
        }, false);

        //削除ボタンに関数紐付け
        const eleDelete = document.getElementById('delete' + cntAry);
        eleDelete.addEventListener('click', () => {
            this.deleteAry(cntAry)
        }, false);
    }

    //配列削除
    deleteAry = (cntAry) => {

        //配列削除
        this.todoList.splice(cntAry, 1);

        //表示更新
        this.changeDisplay();
    }

    //状態切り替え
    switchStatus = (cntAry) => {

        if (this.todoList[cntAry]['status'] === '作業中') {
            this.todoList[cntAry]['status'] = '完了';
        } else {
            this.todoList[cntAry]['status'] = '作業中';
        }

        //表示更新
        this.changeDisplay();
    }
}