package newton.grupp2.holidaymaker.services;

import newton.grupp2.holidaymaker.entities.HotelImage;
import newton.grupp2.holidaymaker.utils.HmUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Date;

@Service
public class HotelImageService {

    public HotelImage saveImageToFileSystem(MultipartFile imageFile) throws Exception {
        String originalFileName = imageFile.getOriginalFilename();
        String outputFileName = new Date().getTime() + "-" + originalFileName;
        byte[] bytes = imageFile.getBytes();
        Path path = HmUtils.imagesPath.resolve(outputFileName);

        System.out.println("Path: " + path);

        // Save the file
        String savedFileName = Files.write(path, bytes).getFileName().toString();
        return new HotelImage(savedFileName);
    }

}
