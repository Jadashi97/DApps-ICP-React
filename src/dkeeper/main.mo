import List "mo:base/List";
import Debug "mo:base/Debug";
import take "mo:base/Debug";
import drop "mo:base/Debug";

actor Dkeeper {

  public type Note = {
    title : Text;
    content : Text;
  };

  stable var notes : List.List<Note> = List.nil<Note>(); //create an empty array notes

  public func createNote(titleText : Text, contentText : Text) {

    let newNote : Note = {
      title = titleText;
      content = contentText;
    };

    notes := List.push(newNote, notes); //use push function

    // Debug.print(debug_show (notes));
  };

  public query func readNotes() : async [Note] {
    return List.toArray(notes);
  };

  public func removeNote(id : Nat) {

    let listFront = List.take(notes, id); //use the take function to return notes
    let listBack = List.drop(notes, id + 1); //use the drop function

    notes := List.append(listFront, listBack); //uses the append func to

    // Debug.print(debug_show (notes));
  };
};
