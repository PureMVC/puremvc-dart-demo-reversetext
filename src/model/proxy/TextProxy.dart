class TextProxy extends MVCProxy
{
<<<<<<< HEAD
  static final String NAME = "TextProxy";
  static final String TEXT_CHANGED = "text/changed";
=======
  static const String NAME = "TextProxy";
  static const String TEXT_CHANGED = "text/changed";
>>>>>>> Changed static finals to static consts
  
  TextProxy():super( NAME ){
  }

  // Use accessors to cast data property to string 
  // and send a notification when it changes
  String get text() { return data; }
  void set text( String t ) {
    this.setData(t);
    this.sendNotification( TEXT_CHANGED, text );
  }
}
