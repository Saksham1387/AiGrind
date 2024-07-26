
import java.io.*;
import java.util.*;

public class Main {
    
    ##USER_CODE_HERE##

    public static void main(String[] args) {
        String filePath = "/dev/problems/understanding-feature scaling/tests/inputs/##INPUT_FILE_INDEX##.txt"; 
        List<String> lines = readLinesFromFile(filePath);
        int size_features = Integer.parseInt(lines.get(0).trim());

        List<Float> features = new ArrayList<>(size_features);

        String[] inputStream = lines.get(1).trim().split("\s+");

        for (String inputChar : inputStream)  {

          features.add(Float.parseFloat(inputChar));

        }

        List<Float> result = min_max_scale(features);
        System.out.println(result);
    }
    public static List<String> readLinesFromFile(String filePath) {
        List<String> lines = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                lines.add(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return lines;
    }
}