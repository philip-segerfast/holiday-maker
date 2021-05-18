package newton.grupp2.holidaymaker.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import newton.grupp2.holidaymaker.utils.colors.PrintUtils;

import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Contains some global variables and will contain some helper methods
 */
public class HmUtils {

    public static final Path imagesPath = Paths.get(System.getProperty("user.dir")).resolve("src/main/resources/static/uploads");

    // Formats the code in a nice way (including indentation)
    private static ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();

    public static String getPrettyToString(Object object) {
        try {
            return PrintUtils.getToStringLine(ow.writeValueAsString(object));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return PrintUtils.getToStringLine("Default toString: " + object.toString());
    }
}
