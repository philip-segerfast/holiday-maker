package newton.grupp2.holidaymaker.utils.colors;

import static newton.grupp2.holidaymaker.utils.colors.ConsoleColor.*;

public class PrintUtils {

    private static final ConsoleColor ERROR_COLOR = GRAY;
    private static final ConsoleColor ERROR_BG_COLOR = RED_BG;
    private static final ConsoleColor INFO_COLOR = GRAY;
    private static final ConsoleColor INFO_BG_COLOR = GREEN_BG;
    private static final ConsoleColor DEBUG_COLOR = GRAY;
    private static final ConsoleColor DEBUG_BG_COLOR = BRIGHT_BLUE_BG;

    /**
     * <p>
     *     Prints a colored line.
     *     import this so that you don't have to write PrintUtils.printlnc. printlnc will be enough.
     * </p>
     * <p>
     *     <code>import static com.grupp4.radioproject.utils.PrintUtils.printlnc;</code>
     * </p>
     * <p>
     *     <i>Usage:</i><br>
     *     <code> printlnc("This text is blue", ConsoleColor.BLUE);</code>
     * </p>
     * <p>
     *     @param color Which color to use. (use ConsoleColor.[color])
     *     @param str String to print.
     * </p>
     */
    public static void printColoredLine(String str, ConsoleColor color) {
        doPrint(color + str);
    }

    public static void printError(String str) {
        doPrint("" + ERROR_BG_COLOR + ERROR_COLOR + "[ERROR]" + RESET + RED + " " + str);
    }

    public static void printInfo(String str) {
        doPrint("" + INFO_BG_COLOR + INFO_COLOR + "[INFO]" + RESET + GREEN + " " + str);
    }

    public static void printDebug(String str) {
        doPrint("" + DEBUG_COLOR + DEBUG_BG_COLOR + "[DEBUG]" + RESET + BLUE + " "  + str);
    }

    private static void doPrint(String str) {
        System.out.println(str + RESET);
    }

    public static String getColoredLine(String str, ConsoleColor color) {
        return getNewLineAndReset(color + str);
    }

    public static String getToStringLine(String str) {
        return getNewLineAndReset(YELLOW + str);
    }

    private static String getNewLineAndReset(String str) {
        return str + RESET + System.lineSeparator();
    }

}
