// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

/** Class containing server statistics. */
public final class Comment {

  private final String text;
  private final long time;
  private final String user;

  public Comment(String text, long time, String user) {
    this.time = time;
    this.text = text;
    this.user = user;
  }

  public String getText() {
    return text;
  }
  public Long currentTime() {
    return time;
  }

  public String getUser(){
    return user;
  }
}