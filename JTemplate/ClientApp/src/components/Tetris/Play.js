import React from "react";
import './Play.css';
import io from 'socket.io-client';

class Play extends React.Component {


  componentWillUnmount() {
    this.socket.close();
  }
  componentDidMount() {
    this.socket = io('http://localhost:9000/tetris');
    var socket = this.socket;

    var controls = {
      up: false,
      down: false,
      left: false,
      right: false,
      space: false,
      c: false,
    }

    document.addEventListener('keydown', function(event) {

      switch (event.keyCode) {
        case 65: // A
        case 37:
          controls.left = true;
          break;
        case 87: // W
        case 38:
          controls.up = true;
          break;
        case 68: // D
        case 39:
          controls.right = true;
          break;
        case 83: // S
        case 40:
          controls.down = true;
          break;
        case 32:
          controls.space = true;
          break;
        case 67:
          controls.c = true;
          break;


      }
      socket.emit('controls', controls);
    });
    document.addEventListener('keyup', function(event) {
      switch (event.keyCode) {
        case 65: // A
        case 37:
          controls.left = false;
          break;
        case 87: // W
        case 38:
          controls.up = false;
          break;
        case 68: // D
        case 39:
          controls.right = false;
          break;
        case 83: // S
        case 40:
          controls.down = false;
          break;
        case 32:
          controls.space = false;
          break;
        case 67:
          controls.c = false;
          break;
      }
    });
    var canvas = document.getElementById('tetris-canvas');



      /*setInterval(function() {
      socket.emit('controls', controls);
    }, 1000 / 10);
    */


    canvas.width = 400;
    canvas.height = 660;
    var context = canvas.getContext('2d');

    socket.on('state', function(grid) {

        context.fillStyle = 'black';
        context.fillRect(0, 0, 400, 660);


        context.strokeStyle = '#343a40';
        context.lineWidth = '1px';
        context.beginPath();
        for (var x = 0; x <= grid.width+1; x++) {
          context.moveTo(x*30, 0);
          context.lineTo(x*30, grid.height*32 - 13);
          context.stroke();
        }
        for (var y = 0; y <= grid.height+1; y++) {
          context.moveTo(0, y*30);
          context.lineTo(grid.width*33 +2, y*30);
          context.stroke();
        }

        //if (grid.shapes.length > 0) {
          grid.shapes.forEach((shape) => {
            context.fillStyle = shape.color;

            shape.coords.forEach((coordinate) => {
              //context.moveTo(coordinate.x*30, coordinate.y*30);
              context.fillRect((coordinate._x*30)+1, (coordinate._y*30)+1, 28, 28);
            });
          });
        //}

        if (grid.activeShape) {
          context.moveTo(grid.activeShape.x, grid.activeShape.y);
          context.fillStyle = grid.activeShape.color;

          grid.activeShape.coords.forEach((coordinate) => {
            //context.rect(coordinate.x*30, coordinate.y*30, (coordinate.x*30)+30, (coordinate.y*30)+30);
            //context.moveTo(coordinate.x*30, coordinate.y*30);
            context.fillRect((coordinate._x*30)+1, (coordinate._y*30)+1, 28, 28);
          });

          //look for furthest spot vertically down to draw ghost shape
          for (var y = 0; y <= grid.height; y++) {

                var newShape = {
                  id: grid.activeShape.id,
                  x: grid.activeShape.x,
                  y: grid.activeShape.y,
                  coords: [],
                  color: grid.activeShape.color,
                }
                grid.activeShape.coords.forEach((coordinate) => {
                  newShape.coords.push({_x: coordinate._x, _y: coordinate._y});
                });


                newShape.y += y;
                newShape.coords.forEach((coordinate) => {
                  coordinate._y += y;
                });
                var collision = false;


                grid.shapes.forEach((shape) => {
                  shape.coords.forEach((coordinate) => {
                    newShape.coords.forEach((coord) => {
                      if (coord._x == coordinate._x && coord._y == coordinate._y) {
                        collision = true;
                      }
                    });
                  });
                });

                newShape.coords.forEach((coordinate) => {
                  if (coordinate._y > grid.height) {
                    collision = true;
                  }
                });

                if (collision) {
                  newShape._y--;
                  newShape.coords.forEach((coordinate) => {
                    coordinate._y--;
                  });

                  context.moveTo(newShape.x,newShape.y);
                  context.fillStyle = 'rgb(255, 255, 255, 0.1)';

                  newShape.coords.forEach((coordinate) => {
                    context.fillRect((coordinate._x*30)+1, (coordinate._y*30)+1, 28, 28);
                  });

                  break;
                }


              }

          /*if (grid.ghostShape) {
            context.moveTo(grid.ghostShape.x, grid.ghostShape.y);
            context.fillStyle = 'rgb(255, 255, 255, 0.1)';

            grid.ghostShape.coords.forEach((coordinate) => {
              //context.rect(coordinate.x*30, coordinate.y*30, (coordinate.x*30)+30, (coordinate.y*30)+30);
              //context.moveTo(coordinate.x*30, coordinate.y*30);
              context.fillRect((coordinate._x*30)+1, (coordinate._y*30)+1, 28, 28);
            });
          }*/


        }


    });
  }

  render() {
    return (

      <div className='container'>
        <h1>Tetris</h1>

        <canvas id="tetris-canvas"></canvas>


      </div>);
  }

}


export default Play;
