
import java.io.*;
import java.util.*;

public class Main {
    
    ##USER_CODE_HERE##

    public static void main(String[] args) {
        String filePath = "/dev/problems/understanding-regularization in linear regression/tests/inputs/##INPUT_FILE_INDEX##.txt"; 
        List<String> lines = readLinesFromFile(filePath);
        int size_weights = Integer.parseInt(lines.get(0).trim());

        List<Float> weights = new ArrayList<>(size_weights);

        String[] inputStream = lines.get(1).trim().split("\s+");

        for (String inputChar : inputStream)  {

          weights.add(Float.parseFloat(inputChar));

        }

  float lambda_ = Float.parseFloat(lines.get(2).trim());
        float result = compute_regularization(weights, lambda_);
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