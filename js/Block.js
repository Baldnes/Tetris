(function () {
    window.Block = function () {
        // 得到随机的方块
        // 第一步罗列所有的类型
        var allType = ['S', 'T', 'O', 'L', 'J', 'I', 'Z']
        // 第二步从所有的类型中随机得到一种
        this.type = allType[parseInt(Math.random() * allType.length)]
        // console.log(this.type)
        // 第三步得到随机的类型方块，获取总数量
        this.allDir = fangkuai[this.type].length
        // console.log(this.allDir)
        // 第四步得到随机类型的不同数字
        this.dir = parseInt(Math.random() * this.allDir)
        // console.log(this.dir)
        // 第五步得到随机方块
        this.code = fangkuai[this.type][this.dir]
        // console.log(this.code)
        //     初始的行和列
        this.row = 0
        this.col = 4
    }
    Block.prototype.render = function () {
        //     渲染四行四列的方块
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                //     如果四乘四的矩阵中某一项不为0，渲染这个颜色
                if (this.code[i][j] != 0) {
                    game.setColor(i + this.row, j + this.col, this.code[i][j])
                }
            }
        }
    }
    Block.prototype.check = function (row, col) {
        //     判断
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (this.code[i][j] != 0 && game.map.mapCode[i + row][j + col] !== 0) {
                    return false
                }
            }
        }
        return true
    }
    // 方块下落，判断当前的方块是否能够进行下落
    Block.prototype.checkDown = function () {
        // 判断地图位置是否和方块重合
        if (this.check(this.row + 1, this.col)) {
            this.row++
        } else {
            //     渲染新方块
            game.block = game.nextBlock
            game.nextBlock = new Block()
            //     渲染到地图上
            this.renderMap()
            // 消行
            game.map.checkRemove()
            // 判定游戏结束
            this.checkOver()
        }
    }
    // 判断是否能够向左移动
    Block.prototype.checkLeft = function () {
        if (this.check(this.row, this.col - 1)) {
            this.col--
        }
    }
    // 判断是否可以向右移动
    Block.prototype.checkRight = function () {
        if (this.check(this.row, this.col + 1)) {
            this.col++
        }
    }
    // 一键到底
    Block.prototype.checkBlockEnd = function () {
        while (this.check(this.row + 1, this.col)) {
            this.row++
        }
    }
    // 方块旋转
    Block.prototype.checkRot = function () {
        // 备份旧的形状方向
        var oldDir = this.dir
        this.dir++
        if (this.dir > this.allDir - 1) {
            this.dir = 0;
        }
        this.code = fangkuai[this.type][this.dir]
        //     判断旋转
        if (!this.check(this.row, this.col)) {
            this.dir = oldDir
            this.code = fangkuai[this.type][this.dir]
        }
    }
    // 将到底的方块渲染到地图上
    Block.prototype.renderMap = function () {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (this.code[i][j] !== 0) {
                    game.map.mapCode[this.row + i][this.col + j] = this.code[i][j]
                }
            }
        }
    }
//     游戏结束
    Block.prototype.checkOver = function () {
        for (var i = 0; i < game.col; i++) {
            if (game.map.mapCode[0][i] != 0) {
                clearInterval(game.timer)
                alert("游戏结束!您当前的分数为："+game.score)
            }
        }
    }
})()