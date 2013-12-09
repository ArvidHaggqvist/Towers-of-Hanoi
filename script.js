function notZero(arr) {
    for(i=0;i<arr.length;i++) {
        if(arr[i] !== 0) {
            return {val: arr[i], index: i};
        }
    }
    return {val: 0, index: null};
}

var toh = {
    grid: [],
    NUM_DISCS: 0,
    NUM_COLS: 3,
    createGrid: function(numdiscs, numpoles) {
        this.NUM_DISCS = numdiscs;
        for(i=0;i<numpoles;i++) {
            this.grid[i] = [];
            for(j=0;j<numdiscs;j++) {
                this.grid[i][j] = 0;
            }
        }
    },
    setDiscDefault: function() {
        for(i=1;i<=this.NUM_DISCS;i++) {
            this.grid[0][i-1] = i;
        }
        console.log(this.grid[0]);
    },
    isSolved: function(grid) {
        return (grid[this.NUM_COLS-1] === [1,2,3,4]) ? true : false; 
    },
    move: function(fromcol, tocol) {
        var from = this.grid[fromcol-1],
            to = this.grid[tocol-1];
        var fromdata = notZero(from);
        var fromdisc = fromdata.val;
        
        console.log("Fromdisc" + fromdisc);
        console.log("From Column: " + fromcol + "\nArray: " + from);
        console.log("To Column: " + tocol + "\nArray: " + to);
        
        // Remove disc
        from[fromdata.index] = 0;
        
        //Place it on the new column
        for(i=to.length;i>=0;i--) {
            if(to[i] === 0) {
                to[i] = fromdisc;
                break;
            }
        }
        this.printMove(fromcol, tocol);
    },
    checkValidMove: function(fromcol, tocol) {
        var from = this.grid[fromcol-1],
            to = this.grid[tocol-1];
        var fromdisc = notZero(from).val, todisc = notZero(to).val;
        
        console.log(fromdisc < todisc && fromdisc !== 0 || todisc === 0);
        // Check if valid
        return (fromdisc < todisc && fromdisc !== 0 || todisc === 0) ? true : false;
        
    },
    solve: function(grid) {
        var oddNumDiscs = (this.NUM_DISCS % 2 === 0) ? false : true;
        if(oddNumDiscs) {
            this.solveOdd(grid);
        }
        else {
            this.solveEven(grid);
        }
    },
    solveOdd: function(grid) {
        var currentStep = 1; 
        for(ik=0;ik<Math.pow(2, this.NUM_DISCS) - 1;ik++) {
            
            if(currentStep === 1) {
                currentStep++;
                if(this.checkValidMove(1,3)) {
                    this.move(1,3);
                }
                else {
                   this.move(3,1);
                }
            }
            else if(currentStep === 2) {
                currentStep++;
                if(this.checkValidMove(1,2)) {
                    this.move(1,2);
                }
                else {
                    this.move(2,1);
                }
            }
            else {
                currentStep = 1;
                if(this.checkValidMove(2,3)) {
                    this.move(2,3);
                }
                else {
                    this.move(3,2);
                }
            }
        }        
    },
    solveEven: function(grid) {
        
        var currentStep = 1; 
        for(ik=0;ik<Math.pow(2, this.NUM_DISCS) - 1;ik++) {
            
            if(currentStep === 1) {
                currentStep++;
                if(this.checkValidMove(1,2)) {
                    this.move(1,2);
                }
                else {
                   this.move(2,1);
                }
            }
            else if(currentStep === 2) {
                currentStep++;
                if(this.checkValidMove(1,3)) {
                    this.move(1,3);
                }
                else {
                    this.move(3,1);
                }
            }
            else {
                currentStep = 1;
                if(this.checkValidMove(2,3)) {
                    this.move(2,3);
                }
                else {
                    this.move(3,2);
                }
            }
        }

    },
    printMove: function(from,to) {
        var div = document.createElement('div');
        var move = "Move from pillar " + from + " to pillar" + to;
        var txt = document.createTextNode(move);
        div.appendChild(txt);
        document.getElementById('c').appendChild(div); 
    },
    init: function(numdiscs, numpoles) {
        this.createGrid(numdiscs, this.NUM_COLS );
        this.setDiscDefault();
        this.solve(this.grid);
    }
}
toh.init(5,3);
//toh.move(1,3);
//console.log(toh.checkValidMove(1,3));
//toh.solve(toh.grid);
console.log(toh.grid);