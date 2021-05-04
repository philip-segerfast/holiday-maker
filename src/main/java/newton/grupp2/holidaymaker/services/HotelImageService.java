package newton.grupp2.holidaymaker.services;

import newton.grupp2.holidaymaker.HmUtils;
import newton.grupp2.holidaymaker.entities.HotelImage;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

@Service
public class HotelImageService {

    public HotelImage saveImageToFileSystem(MultipartFile imageFile) throws Exception {
        String originalFileName = imageFile.getOriginalFilename();
        String fileExtension = originalFileName.substring(originalFileName.lastIndexOf('.'));

        System.out.println("File name: " + originalFileName);
        System.out.println("Extension: " + fileExtension);

        String outputFileName = UUID.randomUUID().toString() + fileExtension;
        byte[] bytes = imageFile.getBytes();
        Path path = HmUtils.imagesPath.resolve(outputFileName);

        System.out.println("Path: " + path);

        String savedFileName = Files.write(path, bytes).getFileName().toString();
        return new HotelImage(savedFileName);
    }

}
