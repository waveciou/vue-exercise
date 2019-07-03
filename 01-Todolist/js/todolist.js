; (function (Vue) {

    const app = new Vue({
        el: '#todolist',
        data: {
            todoList: [
                // {
                //     title: '測試01',
                //     id: '001',
                //     complete: false
                // }
            ],
            newTodoItem: '',
            visibility: 'all',
            cacheTodoItem: {},
            cacheTodoTitle: '',
            pushLocalStorage: function () {
                /* 把資料 push 到 localStorage */
                localStorage.setItem('todoList', JSON.stringify(this.todoList));
            }
        },
        methods: {
            addTodoItem: function () {
                /* 新增待辦資料 */
                let value = this.newTodoItem.trim();
                let timestamp = Math.floor(Date.now());
                if (!value) {
                    return false
                }
                this.todoList.push({
                    title: value,
                    id: timestamp,
                    complete: false
                });
                this.newTodoItem = '';
                this.pushLocalStorage();
            },
            removeTodoItem: function (todoItem) {
                /* 刪除待辦資料 */
                let newIndex = '';
                this.todoList.forEach((item, index) => {
                    if (todoItem.id === item.id) {
                        newIndex = index;
                    }
                });
                this.todoList.splice(newIndex, 1);
                this.pushLocalStorage();
            },
            editTodoItem: function (item) {
                /* 編輯待辦資料 */
                this.cacheTodoItem = item;
                this.cacheTodoTitle = item.title;
                this.pushLocalStorage();
            },
            cancelEditTodoItem: function () {
                /* 取消編輯待辦資料 */
                this.cacheTodoItem = {};
                this.cacheTodoTitle = '';
            },
            doneEditTodoItem: function (item) {
                /* 完成編輯待辦資料 */
                if (!this.cacheTodoTitle.trim()) {
                    return false
                }
                item.title = this.cacheTodoTitle.trim();
                this.cacheTodoItem = {};
                this.cacheTodoTitle = '';
            },
            removeAllTodoItem: function () {
                /* 刪除所有待辦資料 */
                this.todoList = [];
                this.pushLocalStorage();
                localStorage.clear();
                return false
            }
        },
        computed: {
            filterTodoList: function () {
                /* 頁籤的切換 */
                if (this.visibility === 'all') {
                    return this.todoList
                } else if (this.visibility === 'active') {
                    let newTodoList = [];
                    this.todoList.forEach(function (item) {
                        if (item.complete === false) {
                            newTodoList.push(item);
                        }
                    });
                    return newTodoList
                } else if (this.visibility === 'complete') {
                    let newTodoList = [];
                    this.todoList.forEach(function (item) {
                        if (item.complete === true) {
                            newTodoList.push(item);
                        }
                    });
                    return newTodoList
                }
                return []
            },
            filterActiveTodoList: function () {
                /* 篩選出未完成的項目以及數量 */
                let newTodoList = [];
                this.todoList.forEach(function (item) {
                    if (item.complete === false) {
                        newTodoList.push(item);
                    }
                });
                return newTodoList.length
            }
        },
        created() {
            /* 載入 localStorage 的資料 */
            this.todoList = [];
            this.todoList = JSON.parse(localStorage.getItem('todoList')) || [];
        }
    })

})(Vue)