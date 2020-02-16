import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular';

  // Declare variables
  words:string[] = [ "Dadar", "CSMT", "Virar", "Mira Road", "Kalyan", "Khopoli", "Panvel", "Karjat", "Churchgate", "Dombivali", "Thane", "Belapur CBD" ];
  
  indexes:number[] = [];

  textbox:string;
  result:string;
  randomWord:string;
  hiddenWord:string;
  displayedWord:string;
  pattern:string;
  replacement:string;

  chances:number = 5;

  done:boolean = false;

  // Function which replaces character at provided index
  myReplace( string:string, index:number, replacement:string ) {
    return string.substr(0, index) + replacement+ string.substr(index + replacement.length);
  }

  // Function to reload page after 1 sec.
  reloadPage() {
    setTimeout(()=>{
      window.location.reload();
    },1000);
  }

  ngOnInit() {

    // Display random word from words array
    this.randomWord = this.words[Math.floor(Math.random() * this.words.length)].toUpperCase();
    this.hiddenWord = "";

    // Create hidden word of same length as random word to display user
    for ( var i=0; i<this.randomWord.length; i++ ) {
      if ( this.randomWord[i] != " " ) {
        this.hiddenWord += "*";
      }
      else {
        this.hiddenWord += " ";
      }
    }
    this.displayedWord = this.hiddenWord;

  }

  guessMe( letter:string ) {

    if ( letter != " " ) {
      //debugger;
      // Empty textbox once input is received 
      this.textbox = "";
      letter = letter.toUpperCase();

      // If player guessed right letter, then unreveal the letter's position in hidden word
      if ( ( this.randomWord.includes(letter) ) && ( this.chances > 0 ) ) {

        // Iterate over random word to find matched letter
        for ( var j=0; j<this.randomWord.length; j++ ) {

          // Push the index of matched letter to indexes array
          if ( letter == this.randomWord[j] ) {
              this.indexes.push(j);
          }

          // Overwrite hidden word with matched letters
          for ( var k=0; k<this.indexes.length; k++ ) {
            this.replacement = this.randomWord.charAt(this.indexes[k]);
            this.displayedWord = this.myReplace(this.displayedWord, this.indexes[k], this.replacement);
          }

        }

        // Check if random word is cracked or not
        if( this.displayedWord.includes("*") == false ) {
          this.done = true;
        }

      }

      // If player's guess is wrong in final chance, then display result and end the game 
      else if ( ( this.displayedWord.includes("*") == true ) && ( this.chances == 1 ) ) {
        this.chances = 0;
        this.result = "Better luck next time !";
        this.reloadPage();
      }

      // If player's guess is wrong, then decrement chances
      else {
        this.chances--;
      }

      // If word is cracked, then display result and end the game
      if ( this.done == true ) {
        this.result = "Congratulations! You won!!";
        this.reloadPage();
      }

    }

  }
  
}

