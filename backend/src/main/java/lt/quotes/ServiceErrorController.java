package lt.quotes;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;

import org.h2.jdbc.JdbcSQLIntegrityConstraintViolationException;
import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class ServiceErrorController extends ResponseEntityExceptionHandler {

	private static String CONTROLLER_ADVICE = "ControllerAdvice error (from ServiceErrorController)";

	private static String VALIDATION = "Validation Failed";

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		log.error(CONTROLLER_ADVICE);
		ErrorDetails errorDetails = new ErrorDetails(new Date(), VALIDATION, ex.getBindingResult().toString());
		return new ResponseEntity(errorDetails, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler({ IllegalArgumentException.class, ConstraintViolationException.class,
			JdbcSQLIntegrityConstraintViolationException.class })
	protected ResponseEntity<Object> handleIllegalArgument(HttpServletRequest req, Exception ex) {
		log.error(CONTROLLER_ADVICE);
		ErrorDetails errorDetails = new ErrorDetails(new Date(), VALIDATION, ex.getMessage());
		return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
	}

	@Override
	protected ResponseEntity<Object> handleTypeMismatch(TypeMismatchException ex, HttpHeaders headers,
			HttpStatus status, WebRequest request) {
		log.error(CONTROLLER_ADVICE);
		ErrorDetails errorDetails = new ErrorDetails(new Date(), VALIDATION, ex.getMessage());
		return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
	}
}
