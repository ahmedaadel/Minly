import 'package:dio/dio.dart';
import 'package:flutter_mobile_app/shared/constants.dart';

class API {
  static Dio dio = Dio();

  static init() {
    dio = Dio(BaseOptions(
      receiveDataWhenStatusError: true,
    ));
  }

  static Future<Response> getDate(
      {required String url}) async {
    return await dio.get("$domainUrl/$url");
  }
  
  static Future<Response> postData (
      {required String url, required Map<String,dynamic> data}) async {
    return await dio.post("$domainUrl/$url",
        data: data);

  }
  static Future<Response> putData (
      {required String url, required Map<String, dynamic> query}) async {
    return await dio.put("$domainUrl/$url",
        data: query);
  }

}
