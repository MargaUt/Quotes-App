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

@ControllerAdvice
public class ServiceErrorController extends ResponseEntityExceptionHandler {

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		logger.error("ControllerAdvice error (from ServiceErrorController)");
		ErrorDetails errorDetails = new ErrorDetails(new Date(), "Validation Failed", ex.getBindingResult().toString());
		return new ResponseEntity(errorDetails, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler({ IllegalArgumentException.class, ConstraintViolationException.class,
			JdbcSQLIntegrityConstraintViolationException.class })
	protected ResponseEntity<Object> handleIllegalArgument(HttpServletRequest req, Exception ex) {
		logger.error("ControllerAdvice error (from ServiceErrorController)");
		ErrorDetails errorDetails = new ErrorDetails(new Date(), "Validation Failed", ex.getMessage());
		//TODO fix Type safety: The expression of type ResponseEntity needs unchecked conversion to conform to ResponseEntity<Object>
		return new ResponseEntity(errorDetails, HttpStatus.BAD_REQUEST);
	}

	@Override
	protected ResponseEntity<Object> handleTypeMismatch(TypeMismatchException ex, HttpHeaders headers,
			HttpStatus status, WebRequest request) {
		logger.error("ControllerAdvice error (from ServiceErrorController)");
		ErrorDetails errorDetails = new ErrorDetails(new Date(), "Validation Failed", ex.getMessage());
		//TODO fix Type safety: The expression of type ResponseEntity needs unchecked conversion to conform to ResponseEntity<Object>
		return new ResponseEntity(errorDetails, HttpStatus.BAD_REQUEST);
	}
}
