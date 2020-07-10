// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

/** Class containing server statistics. */
public final class Comment {

  private final String text;
  private final Long time;

  public Comment(String text, Long time) {
    this.time = time;
    this.text = text;
  }

  public String getText() {
    return text;
  }
  public Long currentTime() {
    return time;
  }

}