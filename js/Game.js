(function () {
    window.Game = function () {

        this.row = 20;
        this.col = 12;
        //初始化
        this.init()

        //     实例化方块
        this.block = new Block()
        // 下一个方块
        this.nextBlock = new Block()
        //     实例地图
        this.map = new Map(this)
        //     启动定时器
        this.start()
        // 事件监听
        this.bindEvent()
        //     分数
        this.score = 0
        //     速度
        this.during = 40

    }
    Game.prototype.init = function () {
        // 创建table
        var $table = $("<table></table>")
        $table.addClass('tab1')
        //渲染表格
        for (var i = 0; i < this.row; i++) {
            //     创建tr
            var $tr = $('<tr></tr>')
            for (var j = 0; j < this.col; j++) {
                //     创建td
                var $td = $("<td></td>")
                $td.appendTo($tr)
            }
            $tr.appendTo($table)
        }
        var $table2 = $("<table></table>")
        $table2.addClass('tab2')
        for (var i = 0; i < 4; i++) {
            var $tr2 = $('<tr></tr>')
            for (var j = 0; j < 4; j++) {
                var $td2 = $("<td></td>")
                $td2.appendTo($tr2)
            }
            $tr2.appendTo($table2)
        }
        $table.appendTo("body")
        $table2.appendTo("body")


    }
    Game.prototype.setColor = function (row, col, num) {
        // 给对应的颜色方块添加类名
        $(".tab1").find("tr").eq(row).children("td").eq(col).addClass("c" + num)
    }
    Game.prototype.setNextColor = function (row, col, num) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (this.nextBlock.code[i][j] != 0) {
                    $(".tab2").find("tr").eq(i).children("td").eq(j).addClass("c" + this.nextBlock.code[i][j])
                }
            }
        }
    }
    // 清屏功能
    Game.prototype.clear = function () {
        for (var i = 0; i < this.row; i++) {
            for (var j = 0; j < this.col; j++) {
                $(".tab1").find("tr").eq(i).children("td").eq(j).removeClass()
            }
        }
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                $(".tab2").find("tr").eq(i).children("td").eq(j).removeClass()
            }
        }
    }
    Game.prototype.bindEvent = function () {
        var self = this
        $(document).keydown(function (e) {
            if (e.keyCode == 37 || e.keyCode == 65) {
                //     判断向左移动能力
                self.block.checkLeft()
            } else if (e.keyCode == 39 || e.keyCode == 68) {
                // 判断向右移动能力
                self.block.checkRight()
            } else if (e.keyCode == 32 || e.keyCode == 40 || e.keyCode == 83) {
                //     一键到底
                self.block.checkBlockEnd()
            } else if (e.keyCode == 38 || e.keyCode == 87) {
                //     切换方块
                self.block.checkRot()
            }
        })
    }
    Game.prototype.start = function () {
        var self = this;
        this.f = 0
        this.timer = setInterval(() => {
            self.f++
            // 清屏
            self.clear()
            // 渲染方块
            self.block.render()
            // 渲染预览
            self.setNextColor()
            //     渲染地图
            self.map.render(self)
            //     下落
            self.f % self.during == 0 && self.block.checkDown()
        }, 20)
        document.getElementById("btn").addEventListener('click', () => {
            clearInterval(this.timer)
        })
        this.flag = true
        document.getElementById('btns').addEventListener('click', () => {
            if(self.flag){
                self.flag = false
                clearInterval(this.timer)
                this.timer = setInterval(() => {
                    self.flag = true
                    self.f++
                    // 渲染帧编号
                    document.getElementById('f').innerHTML = "帧编号：" + self.f
                    // 清屏
                    self.clear()
                    // 渲染方块
                    self.block.render()
                    // 渲染预览
                    self.setNextColor()
                    //     渲染地图
                    self.map.render(self)
                    //     下落
                    self.f % self.during == 0 && self.block.checkDown()
                }, 20)
            }
        })
    }

})()