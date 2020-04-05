<template>
  <div class="home">
    <div id="content"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import * as Phaser from 'phaser'
import { GameScene } from '../Scene';

@Component
export default class App extends Vue {
  // Data property
  public myDataProperty: string | undefined = undefined;
  public game: any

  // Lifecycle hook
  mounted () {
    console.log("WE'RE GETTING POGGED UP BOYS")
    this.game = new Phaser.Game(
      {
        width: 1400,
        height: 600,
        type: Phaser.AUTO,
        parent: 'content',
        scene: [GameScene],
        physics: {
          default: 'arcade',
          arcade: {
              gravity: { y: 800 },
              debug: false
          }
        },
        backgroundColor: "#4D7980"
      }
    );
  }

}
</script>
<style>
body{
  background-color: #267480;
}
</style>
