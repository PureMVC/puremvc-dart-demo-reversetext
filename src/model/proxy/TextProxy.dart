class TextProxy extends MVCProxy
{
  static final String NAME = "TextProxy";
  static final String TEXT_CHANGED = "text/changed";
  
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
