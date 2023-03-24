(function () {
    // 地图矩阵
    window.Map = function () {
        this.mapCode = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
        ]
    }
    Map.prototype.render = function (mapGame) {
        for (var i = 0; i < mapGame.row; i++) {
            for (var j = 0; j < mapGame.col; j++) {
                game.setColor(i, j, this.mapCode[i][j])
            }
        }
    }
    Map.prototype.checkRemove = function () {
        //     判断消行
        for (var i = 0; i < 20; i++) {
            if (this.mapCode[i].indexOf(0) === -1) {
                // 消除
                this.mapCode.splice(i, 1)
                // 删除一行补一行
                this.mapCode.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
                // 分数增加
                if(game.during > 20) {
                    game.score += 10
                } else if (game.during <= 20 && game.during >10) {
                    game.score += 20
                } else {
                    game.score += 30
                }
                document.getElementById('score').innerHTML = "分数：" + game.score
                if(game.score % 100 == 0) {
                    game.during -= 5
                    if(game.during <= 0){
                        game.during = 1
                    }
                }
            }
        }
    }
})()