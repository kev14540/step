// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import com.google.gson.Gson;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {
  ArrayList<String> comments = new ArrayList<String>();
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    //adds comments
    for(int x = 0; x < 3; x++) {
      comments.add("" + x);
    }

    Gson gson = new Gson(); 
    //String json = convertToJson(comments);

    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(comments));
  }

  private String convertToJson(ArrayList messages){
    int size = messages.size();
    //error case
    if(size < 1) {
      return "{\"comments\":}";
    }

    //base case and middle cases
    String json = "{ \"comments\": [ \"" + messages.get(0) +"\"";
    for(int x = 1; x < messages.size() - 1; x++) {
      json += ", \"" + messages.get(x) + "\"";
    }

    //formats last element 
    if(size > 1) {
        json += ", \"" + messages.get(size - 1) + "\"";
    }
    json += " ] }";
    return json;
  }
}
