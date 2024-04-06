class Media {
  int isliked;
  //Map<String, dynamic> content;
  String? media_type;
  int id;
  List<dynamic> content;

  Media(
      {required this.isliked,
      required this.content,
      required this.media_type,
      required this.id,
    });

  factory Media.fromJson(Map<dynamic, dynamic> json) {
    print(json['content']);
    return Media(
      id: json['id'] as int,
      media_type: json['media_type'] as String?,
      isliked: json['isliked'],

      content:json['content']['data']
    );
  }

  // Convert Phone instance to a JSON map
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'media_type': media_type,
      'isliked': isliked,
     //'content': content,
    };
  }
}

