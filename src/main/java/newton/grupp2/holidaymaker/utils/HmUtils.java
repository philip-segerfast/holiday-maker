package newton.grupp2.holidaymaker.utils;

import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Contains some global variables and will contain some helper methods
 */
public class HmUtils {

    public static final Path imagesPath = Paths.get(System.getProperty("user.dir")).resolve("src/main/resources/static/uploads");

}
